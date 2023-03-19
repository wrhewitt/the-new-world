import Link from 'next/link'
import Container from '../components/container'

export default function Header() {
  return (
    <header className="bg-black mb-3">
      <Container>
        <nav className="flex">
          <Link className="text-2xl rounded hover:bg-white py-3 px-3" href="/">About</Link>
          <Link className="text-2xl rounded hover:bg-white py-3 px-3" href="/posts">Posts</Link>
        </nav>
      </Container>
    </header>
  )
}
