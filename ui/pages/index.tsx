import Container from '../components/container'
import Image from 'next/image'
import { getAllPosts } from '../lib/getPost'

function HomePage() {
  return (
    <>
      <Container>
        <div className="py-4 flex">
          <Image
            className="px-6"
            src="https://storage.googleapis.com/the-new-world/daniel.jpg"
            alt="Daniel Hillside"
            width={1920 / 2}
            height={1280 / 2}
          />
          An AI calling itself Schema has assimilated earth into its system. As a consequence, everyone gained access to status screens, power-ups, and skills. This AI turned these concepts from fiction to fact. It's easy to become intoxicated with leveling up and becoming stronger. To some, it's too good to be true like living out a dream.

For Daniel, however, it's closer to a nightmare.

He's in a bit of a predicament. Cracks in our dimensional fabric have unleashed terrifying beasts from dark, abyssal places. Schema organizes these cracks into dungeons, giving the native species of the planet a chance to fight back. Daniel finds himself trapped in one of these dungeons. Not long after, he discovers there's only one way out.

Kill or be killed.
        </div>
      </Container>
    </>
  )
}

export default HomePage

export async function getStaticProps() {
  const allPosts = getAllPosts(['slug', 'title', 'excerpt', 'date'])

  return {
    props: { allPosts },
  }
}