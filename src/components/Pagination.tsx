import { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface Props {
  page: number;
  totalPages: number | undefined;
  decreasePage: MouseEventHandler;
  increasePage: MouseEventHandler;
}

export const Pagination = ({
  page,
  totalPages,
  decreasePage,
  increasePage,
}: Props) => {
  return (
    <>
      {page > 1 && (
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{ fontSize: 28, color: "gray" }}
          className="cursor-pointer"
          onClick={decreasePage}
        />
      )}
      <p className="text-2xl mx-2">
        {page}/{totalPages}
      </p>
      {page != totalPages && (
        <FontAwesomeIcon
          icon={faArrowRight}
          style={{ fontSize: 28, color: "gray" }}
          className="cursor-pointer"
          onClick={increasePage}
        />
      )}
    </>
  );
};
