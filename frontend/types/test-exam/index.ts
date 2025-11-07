export const fullAssessmentInclude = {
  parts: {
    include: {
      passage: {
        include: {
          passageHeadingList: true,
        },
      },
      questionGroups: {
        include: {
          questions: true,
          multiOneList: { include: { choices: true, question: true } },
          multiMoreList: { include: { choices: true, question: true } },
          identifyInfoList: { include: { question: true } },
          completion: { include: { questions: true } },
          matching: {
            include: {
              matchingChoiceList: { include: { question: true } },
            },
          },
        },
      },
      questions: true,
    },
  },
  questions: true,
} satisfies Prisma.AssessmentInclude;
