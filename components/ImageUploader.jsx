import React, { useEffect, useRef, useState } from 'react';
import Modal from '../Modal';
import { fetch } from '@inrupt/solid-client-authn-browser'
import Cropper from 'react-cropper';
import { PatientLoader } from "./elements";

const ImageContainerUrl =
  "https://exquisite-corpse.mysilio.me/mozfest2022/images/";

const ImageEditingModule = ({ src, onSave, onClose, ...props }) => {
  const [saving, setSaving] = useState()
  const cropperRef = useRef()
  const save = async () => {
    setSaving(true)
    await onSave(cropperRef.current.cropper.getCroppedCanvas())
    setSaving(false)
  }
  return (
    <div className="p-4" onClose={onClose} {...props}>
      <Cropper
        ref={cropperRef}
        src={src}
        autoCropArea={1}
        viewMode={1}
        crossOrigin="use-credentials"
        className="h-96"
      />
      <div className="flex flex-row p-6 justify-center">
        <button className="btn-filled btn-square btn-md mr-3" onClick={() => {
          cropperRef.current.cropper.rotate(90)
        }}>
          rotate
        </button>
        {saving ? (
          <PatientLoader/>
        ) : (
          <>
            <button className="btn-filled btn-square btn-md mr-3" onClick={save}>
              done editing
            </button>
            <button className="btn-filled btn-square btn-md" onClick={onClose}>
              cancel
            </button>
          </>
        )}
      </div>
    </div >
  )
}

const uploadToContainerFromCanvas = (canvas, containerUri, type, { fetch: passedFetch } = {}) => new Promise((resolve, reject) => {
  const myFetch = passedFetch || fetch
  canvas.toBlob(async (blob) => {
    const response = await myFetch(containerUri, {
      method: 'POST',
      force: true,
      headers: {
        'content-type': type,
        credentials: 'include'
      },
      body: blob
    });
    if (response.ok) {
      resolve(response)
    } else {
      reject(response)
      console.log("image upload failed: ", response)
    }
  }, type, 1)

})

function UploadFileButton({ onFileChanged, ...rest }) {
  const inputRef = useRef()
  return (
    <>
      <button {...rest} onClick={() => inputRef.current.click()}>
        pick a file
      </button>
      <input
        ref={inputRef}
        accept="image/*"
        style={{ display: 'none' }}
        type="file"
        onChange={(e) => {
          const f = e.target.files && e.target.files[0];
          onFileChanged(f);
        }}
      />
    </>
  )
}

export function ImageUploadAndEditor({ onSave, onClose }) {
  const [editing, setEditing] = useState(false);
  const [originalSrc, setOriginalSrc] = useState();
  const [previewSrc, setPreviewSrc] = useState();
  const [croppedCanvas, setCroppedCanvas] = useState();

  const [file, setFile] = useState();
  const onFileChanged = (file) => {
    setFile(file);
  };

  useEffect(() => {
    let objectUrl;
    if (file) {
      objectUrl = URL.createObjectURL(file);
      setOriginalSrc(objectUrl);
      setPreviewSrc(objectUrl);
      setEditing(true);
    }
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file]);

  async function save() {
    const response = await uploadToContainerFromCanvas(
      croppedCanvas,
      ImageContainerUrl,
      file.type
    );
    const newImagePath = response.headers.get("location");

    const newImageUrl = new URL(newImagePath, response.url);
    onSave && onSave(newImageUrl.toString(), file);
  }

  return (
    <>
      {editing ? (
        <ImageEditingModule
          open={editing}
          src={originalSrc}
          onClose={onClose}
          onSave={async (canvas) => {
            setPreviewSrc(canvas.toDataURL(file.type));
            setCroppedCanvas(canvas);
            setEditing(false);
          }}
        />
      ) : (
        <div className="flex flex-col h-96">
          {previewSrc && (
            <div className="flex flex-row justify-center items-center flex-grow">
              <img
                src={previewSrc}
                className="h-32 object-contain"
                alt="your new profile"
              />
            </div>
          )}
          <div className="flex flex-row justify-center items-center flex-grow-0 p-6">
            <UploadFileButton
              className="btn-md btn-filled btn-square mr-3"
              onFileChanged={onFileChanged}
            >
              pick an image
            </UploadFileButton>
            {croppedCanvas && (
              <>
                <button
                  className="btn-md btn-filled btn-square mr-3"
                  onClick={() => setEditing(true)}
                >
                  edit
                </button>
                <button
                  className="btn-md btn-filled btn-square mr-3"
                  onClick={save}
                >
                  save
                </button>
              </>
            )}
            <button
              className="btn-md btn-transparent btn-square mr-3 text-gray-700"
              onClick={() => onClose && onClose()}
            >
              cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function ImageUploadModal({ open, setOpen, onSave }) {
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <div>
        <ImageUploadAndEditor
          onSave={onSave}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>
    </Modal>
  );
}