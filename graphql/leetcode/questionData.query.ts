import { gql } from 'urql';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Dimension: any;
  HexColor: any;
  Quality: any;
};

export type QuestionDataQuery = {
  __typename?: 'Query';
  question?: {
    __typename?: 'QuestionNode';
    questionId?: string | null;
    title?: string | null;
    titleSlug?: string | null;
    content?: string | null;
    difficulty?: string | null;
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
