export default function handler(req, res) {
  res.status(200).json({
    internacionalPlayer: 'Luis Adriano',
    lastGoal: 'I dont remenber',
    howManyTime: 'years a go',
    club: {
      name: 'Internacional Sport Club',
      nickNames: [
        'The Club Of The People of The Elite',
        'Chanpion All',
        
      ]
    },
    internacionalPlayerNickNames: [
      'LA',
      'Mano Menezes Brother'
    ],
    gremioPlayer: 'Luisito Suarez',
    lastGremioGoal: 'E C The Biggest Caxias',
    gremioHowManyTime: 'just two weeks a go',
    gremioClub: {
      name: 'Grêmio Foot-Ball Porto Alegrense',
      nickNames: [
        'Immortal',
        'Tricolor of the Pampas',
        'Club for all'
      ]
    },
    gremioPlayerNickNames: [
      'M (S) N',
      'El Pistoleiro'
    ]
  })
}