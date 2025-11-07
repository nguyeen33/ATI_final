import { MockTest } from '@/types/test-exam';

export const mockTests: MockTest[] = [
  {
    id: '1',
    name: 'Academic Practice Test 1',
    description: 'IELTS Academic test with Reading and Listening modules.',
    type: 'academic',
    duration: 5400, // 1.5 hours in seconds
    sections: [
      {
        title: 'Reading Passage 1',
        content: `The coconut palm (Cocos nucifera) is thought to be one of the world's most useful plants. 
        Every part of it can be utilized: the trunk provides timber for building; the leaves can be woven into 
        items such as baskets, mats and roof thatching; the nutrients in its fruit can be processed into food, 
        drink and oil; and the husks and shells can be used as fuel or crafted into tools, musical instruments 
        and other products.

        The origin of the coconut palm is the subject of debate. Some researchers believe it evolved in the 
        Pacific islands, while others think its birthplace was in the Indian Ocean region, possibly the 
        Maldives. What is known is that the coconut palm has been widely cultivated for thousands of years 
        and can now be found growing naturally on tropical coastlines around the world.`,
        questions: [
          {
            id: 'r1q1',
            type: 'multiple-choice',
            question: 'Which part of the coconut palm can be used for construction?',
            options: [
              'The leaves',
              'The trunk',
              'The fruit',
              'The husks'
            ],
            correctAnswer: 'The trunk'
          },
          {
            id: 'r1q2',
            type: 'multiple-choice',
            question: 'The origin of the coconut palm is:',
            options: [
              'Definitely in the Pacific islands',
              'Certainly in the Indian Ocean',
              'Still debated by researchers',
              'Known to be in the Maldives'
            ],
            correctAnswer: 'Still debated by researchers'
          }
        ]
      },
      {
        title: 'Reading Passage 2',
        content: `Urban agriculture, the practice of cultivating food in cities, is gaining momentum worldwide 
        as a sustainable solution to food security challenges. From rooftop gardens in New York to vertical 
        farms in Singapore, cities are finding innovative ways to grow food in limited spaces.

        One significant advantage of urban farming is the reduction in food transportation distances, which 
        helps lower carbon emissions. Additionally, urban farms can utilize waste water and organic waste 
        from the city, turning potential problems into resources. However, challenges remain, including 
        limited space, soil contamination in some urban areas, and the need for specialized knowledge and 
        technology.`,
        questions: [
          {
            id: 'r2q1',
            type: 'matching',
            question: 'Match the following advantages with their descriptions:',
            pairs: [
              { item: 'Transportation', match: 'Reduced carbon emissions' },
              { item: 'Waste management', match: 'Converting problems into resources' }
            ]
          },
          {
            id: 'r2q2',
            type: 'identify-info',
            question: 'Which of the following are mentioned as challenges for urban farming?',
            statements: [
              'Limited space availability',
              'High equipment costs',
              'Soil contamination',
              'Weather conditions',
              'Need for specialized knowledge'
            ],
            correctAnswers: [
              'Limited space availability',
              'Soil contamination',
              'Need for specialized knowledge'
            ]
          }
        ]
      }
    ],
    listeningTasks: [
      {
        number: 1,
        title: 'Section 1: Everyday Conversation',
        audioUrl: '/audio/listening-section-1.mp3',
        type: 'conversation',
        questions: [
          {
            id: 'l1q1',
            type: 'form-completion',
            question: 'Complete the form with NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.',
            form: {
              title: 'Gym Membership Application',
              fields: [
                { label: 'Name', answer: '', maxWords: 3 },
                { label: 'Phone number', answer: '', format: 'number' },
                { label: 'Membership type', answer: '', maxWords: 2 },
                { label: 'Start date', answer: '', format: 'date' }
              ]
            }
          }
        ],
        maxPlays: 2,
        duration: 600 // 10 minutes
      }
    ]
  },
  {
    id: '2',
    name: 'Academic Practice Test 17',
    description: 'IELTS Academic test focusing on innovation and technology.',
    type: 'academic',
    duration: 5400,

    listeningTasks: [
      {
        number: 1,
        title: 'Section 1',
        audioUrl: '/audio/test17-section1.mp3',
        type: 'conversation',
        questions: [
          {
            id: 'l17q1',
            type: 'form-completion',
            question: 'Complete the form with the correct information.',
            form: {
              title: 'Innovation Survey',
              fields: [
                { label: 'Company Name', answer: '', maxWords: 3 },
                { label: 'Industry Type', answer: '', maxWords: 2 },
                { label: 'Number of Employees', answer: '', format: 'number' },
                { label: 'Location', answer: '', maxWords: 2 }
              ]
            }
          }
        ],
        maxPlays: 2,
        duration: 600
      }
    ],

    sections: [
      {
        title: 'Reading Passage 1',
        content: 'A study of Innovation',
        questions: [
          {
            id: '4',
            type: 'multiple-choice',
            question: 'What is the key factor driving innovation according to the passage?',
            options: ['Research funding', 'Market demand', 'Technological advances', 'Competition'],
            correctAnswer: 'Market demand'
          },
          {
            id: '5',
            type: 'multiple-choice',
            question: 'Which of the following best supports innovation in organizations?',
            options: ['Rigid structure', 'Flexible environment', 'Traditional methods', 'Cost cutting'],
            correctAnswer: 'Flexible environment'
          }
        ]
      },
      {
        title: 'Reading Passage 2',
        content: 'Environmental Conservation',
        questions: [
          {
            id: '6',
            type: 'multiple-choice',
            question: 'What is the main challenge in environmental conservation?',
            options: ['Funding', 'Public awareness', 'Technology', 'Political will'],
            correctAnswer: 'Political will'
          }
        ]
      },
      {
        title: 'Reading Passage 3',
        content: 'Digital Transformation',
        questions: [
          {
            id: '7',
            type: 'multiple-choice',
            question: 'What is the primary benefit of digital transformation?',
            options: ['Cost reduction', 'Improved efficiency', 'Better data', 'Customer satisfaction'],
            correctAnswer: 'Improved efficiency'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Academic Practice Test 18',
    description: 'IELTS Academic test focusing on transportation and urban development.',
    type: 'academic',
    duration: 5400,

    listeningTasks: [
      {
        number: 1,
        title: 'Section 1',
        audioUrl: '/audio/test18-section1.mp3',
        type: 'conversation',
        questions: [
          {
            id: 'l18q1',
            type: 'form-completion',
            question: 'Complete the travel booking form.',
            form: {
              title: 'Transportation Booking',
              fields: [
                { label: 'Passenger Name', answer: '', maxWords: 3 },
                { label: 'Destination', answer: '', maxWords: 2 },
                { label: 'Travel Date', answer: '', format: 'date' },
                { label: 'Number of Passengers', answer: '', format: 'number' }
              ]
            }
          }
        ],
        maxPlays: 2,
        duration: 600
      }
    ],

    sections: [
      {
        title: 'Reading Passage 1',
        content: 'The History of Transportation',
        questions: [
          {
            id: '8',
            type: 'multiple-choice',
            question: 'What was the most significant development in transportation?',
            options: ['Steam engine', 'Wheel', 'Combustion engine', 'Electric motor'],
            correctAnswer: 'Wheel'
          }
        ]
      },
      {
        title: 'Reading Passage 2',
        content: 'Modern Architecture',
        questions: [
          {
            id: '9',
            type: 'multiple-choice',
            question: 'Which principle defines modern architecture?',
            options: ['Form follows function', 'Decoration', 'Traditional styles', 'Complex designs'],
            correctAnswer: 'Form follows function'
          }
        ]
      },
      {
        title: 'Reading Passage 3',
        content: 'Artificial Intelligence',
        questions: [
          {
            id: '10',
            type: 'multiple-choice',
            question: 'What is the main application of AI today?',
            options: ['Gaming', 'Data analysis', 'Social media', 'Manufacturing'],
            correctAnswer: 'Data analysis'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Academic Practice Test 19',
    description: 'IELTS Academic test exploring future trends and technology.',
    type: 'academic',
    duration: 5400,

    listeningTasks: [
      {
        number: 1,
        title: 'Section 1',
        audioUrl: '/audio/test19-section1.mp3',
        type: 'conversation',
        questions: [
          {
            id: 'l19q1',
            type: 'form-completion',
            question: 'Complete the job application form.',
            form: {
              title: 'Future Skills Assessment',
              fields: [
                { label: 'Applicant Name', answer: '', maxWords: 3 },
                { label: 'Desired Role', answer: '', maxWords: 3 },
                { label: 'Technical Skills', answer: '', maxWords: 3 },
                { label: 'Experience Level', answer: '', format: 'number' }
              ]
            }
          }
        ],
        maxPlays: 2,
        duration: 600
      }
    ],

    sections: [
      {
        title: 'Reading Passage 1',
        content: 'The Future of Work',
        questions: [
          {
            id: '11',
            type: 'multiple-choice',
            question: 'What will most impact the future of work?',
            options: ['Remote work', 'Automation', 'Education', 'Demographics'],
            correctAnswer: 'Automation'
          }
        ]
      },
      {
        title: 'Reading Passage 2',
        content: 'Space Exploration',
        questions: [
          {
            id: '12',
            type: 'multiple-choice',
            question: 'What is the main goal of current space exploration?',
            options: ['Mars colonization', 'Moon mining', 'Satellite deployment', 'Deep space study'],
            correctAnswer: 'Mars colonization'
          }
        ]
      },
      {
        title: 'Reading Passage 3',
        content: 'Renewable Energy',
        questions: [
          {
            id: '13',
            type: 'multiple-choice',
            question: 'Which renewable energy source has the most potential?',
            options: ['Solar', 'Wind', 'Hydroelectric', 'Geothermal'],
            correctAnswer: 'Solar'
          }
        ]
      }
    ]
  }
];