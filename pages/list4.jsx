import React, { useEffect, useState } from 'react';
import { getList } from '@/config/list'


function CarouselBlog() {
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    getList()
      .then(items => {
        if (mounted) {
          setList(items)
        }
      })
    return () => mounted = false;
  }, [])

  return (
    <>
      {list.map(item => (
        <div key={item.name}>
          <h3>{item.name}</h3>
        </div>
      ))}
    </>
  )
}

export default CarouselBlog;