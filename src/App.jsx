import { useEffect, useState } from 'react'
import roche from "./assets/roche.png"
import papier from "./assets/papier.png"
import ciseaux from "./assets/ciseaux.png"
import './App.css'

const CHOIX = {
  R: { nom: "Roche", image: roche },
  P: { nom: "Papier", image: papier },
  C: { nom: "Ciseaux", image: ciseaux }
}

const RESULTAT = {
  R: { C: 1, P: 2 },
  P: { R: 1, C: 2 },
  C: { P: 1, R: 2 }
}

function App() {
  const [partieCommencee, setPartieCommencee] = useState(false)
  const [scores, setScores] = useState({scoreJ1: 0, scoreJ2: 0})
  const [afficherCombat, setAfficherCombat] = useState(false)
  const [choix, setChoix] = useState({choixJ1: null, choixJ2: null})
  const [statutCombat, setStatutCombat] = useState("")
  const [finJeu, setFinJeu] = useState(false)

  useEffect(() => {
    if (scores.scoreJ1 === 3 || scores.scoreJ2 === 3) {
      setFinJeu(true)
      setStatutCombat(scores.scoreJ1 === 3 ? "Vous avez gagné!" : "Vous avez perdu!")
    }
  }, [scores])

  const recommencerPartie = () => {
    setAfficherCombat(false)
    setPartieCommencee(false)
    setScores({scoreJ1: 0, scoreJ2: 0})
    setFinJeu(false)
  }

  const jouerTour = (J1) => {
    const J2 = Object.keys(CHOIX)[Math.floor(Math.random() * 3)]
    setChoix({choixJ1: CHOIX[J1], choixJ2: CHOIX[J2]})
    const resultatCombat = RESULTAT[J1][J2] || 0
    setAfficherCombat(true)

    if (resultatCombat === 0) {
      setStatutCombat("Égalité")
    } else {
      setScores((dernierScore) => ({
        ...dernierScore,
        scoreJ1: dernierScore.scoreJ1 + (resultatCombat === 1 ? 1 : 0),
        scoreJ2: dernierScore.scoreJ2 + (resultatCombat === 2 ? 1 : 0)
      }))
      setStatutCombat(resultatCombat === 1 ? "Gagné!" : "Perdu :(")
    }
  }

  return (
    <div>
      { finJeu ? (
        <>
          <h1>{statutCombat}</h1>
          <button onClick={recommencerPartie}>Continuer</button>
        </>
      ) : (
        <>
          <h1>Roche, Papier, Ciseaux!</h1>
          <div>
            { !partieCommencee ? (
              <button onClick={() => setPartieCommencee(true)}>Commencer une partie</button>
            ) : (
              <>
                <p>{ scores.scoreJ1 } - { scores.scoreJ2 }</p>
                <div className='play-buttons'>
                  { Object.keys(CHOIX).map((cle) => {
                    return (
                      <button key={cle} onClick={() => jouerTour(cle)}>
                        { CHOIX[cle].nom }
                      </button>
                    )
                  }) }
                </div>
              </>
            )}
          </div>
          { afficherCombat && (
            <>
              <p className='text-block'>{statutCombat}</p>
              <div className='affichage-combat'>
                <img
                  style={{transform: "scaleX(-1)"}}
                  width={200}
                  src={choix.choixJ1.image}
                  alt="Attaque Joueur 1"
                />
                <img
                  width={200}
                  src={choix.choixJ2.image}
                  alt="Attaque Joueur 2"
                />
              </div> 
            </>
          )}
        </>
      )}
    </div>
  )
}

export default App
