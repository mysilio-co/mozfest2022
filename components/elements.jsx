import ReactLoader from 'react-loader-spinner'

const PRIMARY = '#0e90a3'
const SECONDARY = '#579f89' 

export const Loader = (props) => {
  return (
    <ReactLoader
      type="ThreeDots"
      color={PRIMARY}
      secondaryColor={SECONDARY}
      {...props} />
  )
}

export const PatientLoader = (props) => {
  return (
    <ReactLoader
      type="Rings"
      color={PRIMARY}
      secondaryColor={SECONDARY}
      height={120}
      width={120}
      {...props} />
  )
}