import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useGlobalContext } from "./context"

const url = `https://api.unsplash.com/search/photos/?client_id=${
  import.meta.env.VITE_API_KEY
}`

// "https://api.unsplash.com/search/photos/?client_id=G0FZOY9nH3k3tC7UW9sxI4dBXdTWBHJZeAMyvzRGBOc&query=office"

const Gallery = () => {
  const { searchTerm } = useGlobalContext()
  const response = useQuery({
    queryKey: ["images", searchTerm],
    // apart from getting the images with image string, users can also with the search option
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`)

      return result.data
    },
  })

  if (response.isLoading) {
    return (
      <section className='image-container'>
        <h4>Loading...</h4>
      </section>
    )
  }
  if (response.isError) {
    return (
      <section className='image-container'>
        <h4>There was an Error...</h4>
      </section>
    )
  }
  const results = response.data.results
  console.log(results)
  if (results.length < 1) {
    return (
      <section className='image-container'>
        <h4>No result found...</h4>
      </section>
    )
  }

  return (
    <section className='image-container'>
      {results.map((item) => {
        const url = item?.urls?.regular
        return (
          <img
            src={url}
            key={item.id}
            alt={item.alt_description}
            className='img'
            style={{ borderRadius: "0.2rem" }}
          />
        )
      })}
    </section>
  )
}
export default Gallery
