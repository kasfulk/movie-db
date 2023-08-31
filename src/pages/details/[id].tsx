import { useRouter } from "next/router";
import { useDetail } from "@/hooks/useDetail";
import Image from "next/image";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Detail() {
  const router = useRouter();
  const { data, error } = useDetail(router.query.id as string);
  const displayDate = dayjs(data?.release_date).format("DD MMM YYYY");

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24`}
    >
      <div className="w-5xl flex flex-wrap justify-start"></div>
      <div className="max-w-5xl flex flex-col justify-start p-10 border-gray-300 bg-gray-100 w-full rounded-md">
        <div className="cursor-pointer flex mb-4" onClick={() => router.back()}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ fontSize: 38, color: "gray" }}
            className="cursor-pointer w-6"
          />
          <p className=" font-bold text-gray-600 text-2xl mt-1">Back</p>
        </div>
        <Image
          className="rounded-xl"
          alt={data?.title as string}
          src={"https://image.tmdb.org/t/p/w500" + data?.poster_path}
          width={400}
          height={300}
          lazyBoundary="loading.."
        />
        <p className="font-semibold mt-2 text-lg text-ellipsis">
          {data?.title}
        </p>
        {data?.release_date && <p className="text-md">{displayDate}</p>}
        <p className="text-[10px]">{data?.overview}</p>
        <p className="text-[14px] mt-2">{data?.popularity} Popularity</p>
        <div className="flex flex-wrap">
          {data?.genres &&
            data?.genres.map((value) => {
              return (
                <span
                  className="p-2 bg-gray-900 text-white rounded-md mr-1"
                  key={value.id}
                >
                  {value.name}
                </span>
              );
            })}
        </div>
      </div>
    </main>
  );
}
