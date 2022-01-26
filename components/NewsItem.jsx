import Typography from '@material-ui/core/Typography'
export default function NewsItem({ news }) {
  return (
    <div>
      <Typography>
        {news}
      </Typography>
    </div>
  )
}