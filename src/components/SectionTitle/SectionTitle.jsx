import './SectionTitle.scss'

const SectionTitle = (props) => {
  return (
    <h1 className={props.className}>{props.text}</h1>
  )
}

export default SectionTitle