export type Motif = 'palace' | 'forest' | 'hills' | 'ocean' | 'bridge'

export interface Kanda {
  id: number
  hi: string
  en: string
  line: string
  sky: [string, string, string]
  motif: Motif
  lanka?: boolean
  beats: string[]
}

// An original, concise retelling. It is not presented as a scripture translation.
// The Ramayana has many regional and devotional traditions; the Uttara Kanda note
// intentionally makes room for those differences.
export const kandas: Kanda[] = [
  {
    id: 1,
    hi: 'बाल काण्ड',
    en: 'Bala Kanda — The Dawn',
    line: 'A prince is born, and a promise finds its home.',
    sky: ['#172653', '#a94f45', '#f7c978'],
    motif: 'palace',
    beats: [
      'On the banks of the Sarayu, Ayodhya rejoices. King Dasharatha welcomes four sons: Ram, Bharata, Lakshmana and Shatrughna. Ram, the eldest, grows in wisdom, courage and compassion.',
      'Sage Vishwamitra arrives at the royal court and asks for Ram’s help in protecting a sacred yajna. Ram and Lakshmana accompany him, face the dangers of the forest and help restore peace to the sage’s work.',
      'On the journey to Mithila, Ram encounters Ahalya. In a moment remembered as one of compassion and release, her long sorrow comes to an end.',
      'In King Janaka’s court, Sita’s swayamvara gathers kings and princes. Ram lifts Shiva’s great bow; it breaks, and the hall fills with wonder. Ram and Sita are married, joining two families in celebration.'
    ]
  },
  {
    id: 2,
    hi: 'अयोध्या काण्ड',
    en: 'Ayodhya Kanda — The Promise',
    line: 'A crown set aside; a father’s word honoured.',
    sky: ['#101833', '#563458', '#d9874c'],
    motif: 'palace',
    beats: [
      'Ayodhya prepares for Ram’s coronation. The city is decorated, lamps are ready and the people look forward to the day their beloved prince will become king.',
      'Queen Kaikeyi asks King Dasharatha to fulfil two promises made to her long ago: Bharata must be crowned, and Ram must spend fourteen years in exile. The king is overcome, but Ram accepts the decree calmly to protect his father’s word.',
      'Sita and Lakshmana choose to accompany Ram. The three leave the palace and begin a life in the forest. Dasharatha, heartbroken by the separation, soon passes away.',
      'Bharata returns to a kingdom in mourning. He refuses to take a throne that belongs to Ram, travels to meet him and asks him to return. When Ram keeps his vow, Bharata carries Ram’s sandals back to Ayodhya and governs as their guardian until his brother’s return.'
    ]
  },
  {
    id: 3,
    hi: 'अरण्य काण्ड',
    en: 'Aranya Kanda — The Forest',
    line: 'A quiet dwelling, a difficult turning.',
    sky: ['#061a19', '#155144', '#c7a45b'],
    motif: 'forest',
    beats: [
      'Ram, Sita and Lakshmana make their home among the forests, rivers and hermitages of the south. They meet sages, live simply and offer protection to those who seek it.',
      'At Panchavati, Surpanakha approaches Ram and is turned away. Her anger leads to conflict with her kin and eventually brings the powerful Ravana into the story.',
      'Ravana’s plan begins with Maricha, who takes the form of a golden deer. Sita asks Ram to bring it closer. A deceptive cry draws Lakshmana away from the cottage.',
      'Ravana arrives disguised as a mendicant and carries Sita away. Jatayu, an elderly vulture and friend of Dasharatha, courageously tries to stop him and gives Ram a final account of what happened.',
      'Ram and Lakshmana find the empty dwelling. Their search for Sita begins, guided by grief, resolve and the hope that she can be found.'
    ]
  },
  {
    id: 4,
    hi: 'किष्किन्धा काण्ड',
    en: 'Kishkindha Kanda — Friendship',
    line: 'A meeting becomes an alliance; hope gains a direction.',
    sky: ['#1c1538', '#754735', '#f1b46c'],
    motif: 'hills',
    beats: [
      'In the hills near Rishyamukha, Ram and Lakshmana meet Hanuman. Seeing their purpose and character, Hanuman brings them to Sugriva, a Vanara prince living in exile.',
      'Ram and Sugriva make a solemn friendship. Sugriva tells Ram of his conflict with his brother Vali; Ram helps Sugriva regain his place, and Sugriva becomes king of Kishkindha.',
      'When the rains pass, Sugriva sends search parties in every direction. The southern party, including Hanuman, Angada and Jambavan, reaches the vast ocean and learns that Sita is in Lanka.',
      'Jambavan reminds Hanuman of the strength he has forgotten. The search now has a path: someone must cross the sea, find Sita and carry Ram’s message to her.'
    ]
  },
  {
    id: 5,
    hi: 'सुन्दर काण्ड',
    en: 'Sundara Kanda — The Leap',
    line: 'One leap across the sea; a message carried with faith.',
    sky: ['#071b3e', '#236094', '#f4c779'],
    motif: 'ocean',
    lanka: true,
    beats: [
      'Hanuman gathers his strength and leaps over the ocean. Along the way he meets trials that test his courage, discernment and patience; he continues without losing sight of his purpose.',
      'He reaches Lanka and searches carefully through the city. At last, in the Ashoka Vatika, he finds Sita beneath a tree, holding firmly to her hope and dignity.',
      'Hanuman gives Sita Ram’s ring and speaks words of reassurance. Sita sends a token and a message for Ram, trusting Hanuman to carry them safely across the sea.',
      'Before leaving, Hanuman is brought before Ravana and speaks of the path of peace and dharma. He escapes captivity, sets parts of Lanka ablaze in the traditional telling, and returns to Ram with the news that Sita has been found.'
    ]
  },
  {
    id: 6,
    hi: 'युद्ध काण्ड',
    en: 'Yuddha Kanda — The Return',
    line: 'A bridge is built; courage meets its greatest test.',
    sky: ['#260e20', '#8a3431', '#f2ad61'],
    motif: 'bridge',
    lanka: true,
    beats: [
      'Ram’s allies gather at the shore. With Nala’s skill and the Vanara army’s effort, a bridge is built across the sea toward Lanka. The journey that once seemed impossible becomes a shared act of faith and teamwork.',
      'The armies meet in a great conflict. Vibhishana leaves Ravana’s side and joins Ram, choosing the course he believes to be right. The allies stand together through many difficult turns.',
      'Lakshmana is gravely weakened in battle. Hanuman journeys to the Himalayas in search of the life-restoring Sanjeevani herb and returns in time to save him.',
      'At last, Ram and Ravana face one another. Their final encounter becomes the turning point of the war: Ravana is defeated, and the people of Lanka are freed from his rule.',
      'Ram and Sita are reunited. With the years of exile complete, Ram, Sita and their companions begin the journey home in the Pushpak Vimana.'
    ]
  },
  {
    id: 7,
    hi: 'उत्तर काण्ड',
    en: 'Uttara Kanda — Ram Rajya',
    line: 'A kingdom restored, and stories that continue to be discussed.',
    sky: ['#111a3a', '#79502d', '#ffda83'],
    motif: 'palace',
    beats: [
      'Ayodhya welcomes Ram, Sita and their companions. Ram is crowned, and the ideal of Ram Rajya comes to represent just leadership, care for the people and a kingdom where duty is joined with compassion.',
      'The traditional Uttara Kanda also tells later episodes, including Sita’s separation from Ram and the birth and upbringing of Lava and Kusha. These chapters are received differently across regions and traditions; some tellings include them, while others conclude the story at the return and coronation.',
      'Rather than flatten those differences into one version, this journey acknowledges them with respect. Across the many tellings of the Ramayana, the enduring invitation is to keep one’s word, serve with humility, protect the vulnerable and let strength be guided by compassion.'
    ]
  }
]
