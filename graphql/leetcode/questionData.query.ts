import { Scalars } from 'lib/graphql/types';
import { Exact, InputMaybe } from 'lib/utils/types';
import { gql } from 'urql';

export type QuestionDataQuery = {
  __typename?: 'Query';
  question?: {
    __typename?: 'QuestionNode';
    questionId?: string | null;
    title?: string | null;
    titleSlug?: string | null;
    content?: string | null;
    difficulty?: 'Easy' | 'Medium' | 'Hard' | null;
    similarQuestions?: string | null;
    exampleTestcases?: string | null;
    categoryTitle?: string | null;
    topicTags?: Array<{
      name?: string | null;
      slug?: string | null;
      translatedName?: string | null;
      __typename?: 'TopicTagNode';
    } | null>;
    companyTagStats?: string | null;
    stats?: string | null;
    hints?: string[] | null;
  };
};

export type QuestionDataQueryVariables = Exact<{
  titleSlug?: InputMaybe<Scalars['String']>;
}>;

export const QuestionDataDocument = gql<
  QuestionDataQuery,
  QuestionDataQueryVariables
>`
  query questionData($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionId
      title
      titleSlug
      content
      translatedTitle
      translatedContent
      isPaidOnly
      difficulty
      similarQuestions
      exampleTestcases
      categoryTitle
      topicTags {
        name
        slug
        translatedName
        __typename
      }
      companyTagStats
      stats
      hints
      __typename
    }
  }
`;
