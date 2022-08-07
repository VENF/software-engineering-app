import { useState, useEffect } from 'react';
import { getMangaService } from 'src/domain/manga.services';

export const useManga = (title = '', category = '') => {
  const [mangas, setMangas] = useState({
    isLoading: true,
    data: [],
    cache: []
  });

  useEffect(() => {
    if (mangas.cache.length < 1) {
      setMangas((pre) => ({ ...pre, isLoading: true }));
      getMangaService({
        title: title,
        category: category
      }).then((data) => {
        setMangas((pre) => ({
          ...pre,
          isLoading: false,
          data: data,
          cache: data
        }));
      });
      return;
    }
    if (title.length < 1 && mangas.cache.length > 0) {
      setMangas((pre) => ({
        ...pre,
        data: pre.cache
      }));
      return;
    }
    setMangas((pre) => ({ ...pre, isLoading: true }));
    getMangaService({
      title: title,
      category: category
    }).then((data) => {
      setMangas((pre) => ({
        ...pre,
        isLoading: false,
        data: data
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, category]);

  return {
    mangas: mangas.data,
    isLoading: mangas.isLoading
  };
};
