import { FormEvent } from "react";
import { Inter } from "next/font/google";
import { MovieCard } from "@/components/MovieCard";
import { Pagination } from "@/components/Pagination";
import { InputText } from "@/components/Input";
import { FormEventHandler, useEffect, useState } from "react";
import { useSearchQuery } from "@/hooks/useSearch";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { atom, useRecoilState } from "recoil";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const searchState = atom({
    key: "searchState",
    default: "",
  });

  const pageState = atom({
    key: "pageState",
    default: 1,
  });

  const [search, setSearch] = useRecoilState(searchState);
  const [page, setPage] = useRecoilState(pageState);
  const [totalPages, setTotalPages] = useState<number | undefined>(0);

  const [searchDebounce] = useDebounce(search, 500);
  const [pageDebounce] = useDebounce(page, 500);

  const { data, refetch, error } = useSearchQuery({
    query: searchDebounce,
    page: pageDebounce,
  });

  const decreasePage = () => {
    setPage(page - 1);
  };

  const increasePage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    refetch();
  }, [searchDebounce, pageDebounce, refetch]);

  useEffect(() => {
    setTotalPages(data?.total_pages);
  }, [data?.total_pages]);

  const searchHandler = (e: FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setPage(1);
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2x lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 ">
          The Movie Search
        </p>
      </div>
      <div className="z-10 max-w-5xl lg:mt-3 md:mt-2 w-full items-center justify-between font-mono text-sm lg:flex">
        <InputText value={search} onChange={searchHandler} />
      </div>
      {!data?.results[0] && (
        <div className="max-w-5xl flex flex-wrap justify-start">
          No movies founded.
        </div>
      )}
      <div className="max-w-5xl flex flex-wrap justify-center">
        {data?.results[0] && (
          <Pagination
            page={page}
            totalPages={totalPages}
            increasePage={increasePage}
            decreasePage={decreasePage}
          />
        )}
      </div>
      <div className="max-w-5xl flex flex-wrap justify-center">
        {data?.results &&
          data.results.map((value) => {
            return (
              <Link key={value.id} href={"/details/" + value.id}>
                <MovieCard
                  url={"https://image.tmdb.org/t/p/w500" + value.poster_path}
                  title={value.title}
                  overview={value.overview}
                  release_date={value.release_date}
                />
              </Link>
            );
          })}
      </div>
    </main>
  );
}
