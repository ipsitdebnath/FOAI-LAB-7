import DogCard from './components/DogCard'
import JokeCard from './components/JokeCard'
import UserCard from './components/UserCard'
import PostCard from './components/PostCard'
import './index.css'

function App() {
  return (
    <div className="container">
      <header className="fade-in">
        <h1>Public API Playground</h1>
        <p>A premium unified interface demonstrating 4 different REST APIs</p>
      </header>
      
      <main className="grid">
        <DogCard />
        <JokeCard />
        <UserCard />
        <PostCard />
      </main>
    </div>
  )
}

export default App
