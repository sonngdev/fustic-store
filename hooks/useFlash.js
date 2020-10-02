import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeFlashMessages } from 'store/actions';
import { useFlashMessages } from './store';

export default function useFlash() {
  const flash = useFlashMessages();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!flash.length) return () => {};

    return () => {
      dispatch(removeFlashMessages());
    };
  }, []);

  return flash;
}
