import Image from "next/image";
import dayjs from "dayjs";

interface Props {
  url: string;
  title: string;
  overview: string;
  release_date: string;
}

export const MovieCard = ({ url, title, overview, release_date }: Props) => {
  const length = 200;
  const trimmedOverview =
    overview.length > length
      ? overview.substring(0, length - 3) + "..."
      : overview;
  const displayDate = dayjs(release_date).format("DD MMM YYYY");
  return (
    <div className="cursor-pointer p-2 border shadow-sm rounded-lg w-[270px] h-[550px] max-h-[700px] text-ellipsis m-2 bg-gray-200 ">
      <Image
        className="rounded-xl"
        src={url}
        alt={title}
        width={250}
        height={400}
      />
      <p className="font-semibold mt-2 text-lg text-ellipsis">{title}</p>
      {release_date && <p className="text-md">{displayDate}</p>}
      <p className="text-[10px]">{trimmedOverview}</p>
    </div>
  );
};
