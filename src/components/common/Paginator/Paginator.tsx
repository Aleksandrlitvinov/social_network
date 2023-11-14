import * as React from "react";
import styles from './Paginator.module.css'

type PropsType = {
  totalUsersCount: number,
  pageSize: number,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  portionSize?: number
}
const Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, setCurrentPage, portionSize = 10}: PropsType) => {

  let pagesCount = Math.ceil(totalUsersCount / pageSize)
  const pages: number[] = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }


  let portionCount = Math.ceil(pagesCount / portionSize)
  const [portionNumber, setPortionNumber] = React.useState<number>(1)
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = portionNumber * portionSize


  return (
    <div className={styles.pagination}>
      {
        portionNumber > 1 && <div
          className={styles.pagBtn}
          onClick={() => setPortionNumber(portionNumber - 1)}
        >
          prev
        </div>
      }

      {
        pages
          .filter((page: number) => (page >= leftPortionPageNumber && page <= rightPortionPageNumber))
          .map((page: number) => <span
              className={
                currentPage === page ?
                  `${styles.pagItem} ${styles.selectedItem}` :
                  `${styles.pagItem}`
              }
              key={page}
              onClick={() => setCurrentPage(page)}
            >
            {page}
          </span>
          )
      }
      {
        portionCount > portionNumber && <div
          className={styles.pagBtn}
          onClick={() => setPortionNumber(portionNumber + 1)}
        >
          next
        </div>
      }

    </div>
  );
};

export default Paginator;
