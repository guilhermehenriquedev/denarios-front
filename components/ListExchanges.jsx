import Typography from '@material-ui/core/Typography'
export default function ListItem({ list }) {
  return (
    <div>
      <Typography>
        {list.name}
      </Typography>
    </div>
  )
}