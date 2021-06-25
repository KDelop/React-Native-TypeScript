import * as Rx from 'rxjs';
import * as React from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { delayWhen, tap } from 'rxjs/operators';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    new Rx.Subject<{ delay?: boolean; index: number }>()
  );
  const listRef = React.useRef<FlatList<T> | null>(null);
  const [onLayoutCalled, setOnLayoutCalled] = React.useState(false);

  React.useEffect(() => {
    const sub = scrollSubject.current
      .pipe(
        delayWhen(x => (x.delay ? Rx.timer(200) : Rx.empty())),
        tap(x =>
          listRef?.current?.scrollToIndex({
            animated: true,
            index: x.index,
            viewOffset
          })
        )
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, []);

  React.useEffect(() => {
    if (onLayoutCalled) {
      scrollSubject.current.next({ index: selectedIndex });
    }
  }, [onLayoutCalled, selectedIndex]);

  return (
    <FlatList
      ref={x => (listRef.current = x)}
      onLayout={() => {
        scrollSubject.current.next({ delay: true, index: selectedIndex });
        setOnLayoutCalled(true);
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      {...rest}
    />
  );
}

export default VerticalScrollList;
