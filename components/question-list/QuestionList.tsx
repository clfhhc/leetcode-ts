import DifficultyLabel from 'components/DifficultyLabel';
import { QuestionListQuery } from 'graphql/leetcode/questionList.query';
import Link from 'next/link';
import { FC, useEffect, useMemo, useState } from 'react';
import {
  CellProps,
  Column,
  Row,
  TableInstance,
  useFilters,
  UseFiltersInstanceProps,
  useTable,
} from 'react-table';
import styles from './QuestionList.module.css';

type QuestionDatum = NonNullable<
  QuestionListQuery['questionList']['data']
>[number];

export interface Props {
  leetcodeSlugs?: string[];
  leetcodeQuestions?: QuestionListQuery['questionList']['data'];
}

const QuestionList: FC<Props> = ({ leetcodeSlugs, leetcodeQuestions }) => {
  const [ready, setReady] = useState(false);

  const data = useMemo(() => leetcodeQuestions || [], [leetcodeQuestions]);
  const columns = useMemo<Column<QuestionDatum>[]>(
    () => [
      {
        Header: 'Title',
        id: 'display',
        accessor: (data) => `${data.questionId}. ${data.title}`,
        Cell: ({ row, value }: CellProps<QuestionDatum, string>) => {
          return (
            <div className={styles['question-link-cell']}>
              <Link
                key={row.values['titleSlug']}
                href={`/leetcode/${row.values['titleSlug']}`}
              >
                {value}
              </Link>
            </div>
          );
        },
      },
      {
        Header: 'Difficulty',
        accessor: 'difficulty',
        filter: 'equals',
        Cell: ({ value }) => (
          <div className={styles['question-difficulty-cell']}>
            <DifficultyLabel difficulty={value} />
          </div>
        ),
      },
      {
        Header: 'Slug',
        accessor: 'titleSlug',
        filter: (
          rows: Row<QuestionDatum>[],
          id: string,
          filterValue: string[]
        ) => {
          return rows.filter((row) => {
            return filterValue.includes(row.values[id]);
          });
        },
      },
      {
        Header: 'Id',
        accessor: 'questionId',
        filter: 'equals',
      },
    ],
    []
  );
  const { setAllFilters, prepareRow, filteredRows, toggleHideColumn } =
    useTable<QuestionDatum>(
      { columns, data },
      useFilters
    ) as TableInstance<QuestionDatum> & UseFiltersInstanceProps<QuestionDatum>;

  useEffect(() => {
    toggleHideColumn('titleSlug', true);
    toggleHideColumn('questionId', true);
    setAllFilters([{ id: 'titleSlug', value: leetcodeSlugs ?? [] }]);
    setReady(true);
  }, [setAllFilters, leetcodeSlugs, toggleHideColumn]);

  return ready ? (
    <div className={styles['question-list']}>
      {filteredRows.map((row) => {
        prepareRow(row);
        return row.cells.map((cell) => {
          return (
            <div {...cell.getCellProps()} key={cell.column.id}>
              {cell.render('Cell')}
            </div>
          );
        });
      })}
    </div>
  ) : null;
};

export default QuestionList;
