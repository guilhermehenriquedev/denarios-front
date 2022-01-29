import { API_URL } from '@/config/index'
import Grid from '@material-ui/core/Grid'
import NewsItem from '@/components/NewsItem'
export default function Lists({ news }) {

  return (
    <div>
      <Grid pb={4} container spacing={7} alignItems="flex-center" justifyContent="center">
        {news.length === 0 && <h3>No News</h3>}
        
        {news.data.map((item) => (
          <Grid
            item
            xs={10}
            md={5}
            key={item}
          >
            <NewsItem news={item} />
          </Grid>
        ))
        }
      </Grid>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/exchanges/list/`)
  const news = await res.json()

  return {
    props: { news },
    revalidate: 1
  }
}