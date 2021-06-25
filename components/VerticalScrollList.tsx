import * as Rx from 'rxjs';
import * as React from 'react';
import {FlatList, FlatListProps} from 'react-native';
import {delayWhen, tap} from 'rxjs/operators';

interface IProps<T> extends FlatListProps<T> {
  selectedIndex: number;
  viewOffset?: number;
}

function VerticalScrollList<T>({
  selectedIndex,
  viewOffset,
  ...rest
}: IProps<T>) {
  const scrollSubject = React.useRef(
    new Rx.Subject<{delay?: boolean; index: number}>(),
  );
  const listRef = React.useRef<FlatList<T> | null>(null);
  const [onLayoutCalled, setOnLayoutCalled] = React.useState(false);

  React.useEffect(() => {
    const sub = scrollSubject.current
      .pipe(
        delayWhen((x) => (x.delay ? Rx.timer(200) : Rx.empty())),
        tap((x) =>
          listRef?.current?.scrollToIndex({
            animated: true,
            index: x.index,
            viewOffset,
          }),
        ),
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, []);

  React.useEffect(() => {
    if (onLayoutCalled && rest.data && rest.data?.length > 0) {
      scrollSubject.current.next({index: selectedIndex});
    }
  }, [onLayoutCalled, selectedIndex, rest.data]);

  return (
    <FlatList
      ref={(x) => (listRef.current = x)}
      onLayout={() => {
        if (rest.data && rest.data?.length > 0) {
          scrollSubject.current.next({delay: true, index: selectedIndex});
        }
        setOnLayoutCalled(true);
      }}
      onScrollToIndexFailed={(info) => {
        if (rest.data && rest.data?.length > 0) {
          scrollSubject.current.next({delay: true, index: info.index});
        }
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      {...rest}
    />
  );
}

export default VerticalScrollList;
