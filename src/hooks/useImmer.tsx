import { useCallback, useState } from 'react';
import { Draft, freeze, produce } from 'immer';

// 这里的 Draft<S> 是 Immer 库中的类型，用于表示可变的草稿状态 草稿函数类型：接收可修改的草稿对象
export type DraftFunction<S> = (draft: Draft<S>) => void;

// Updater<S> 函数签名 接受一个参数 arg 类型是 S 或者 DraftFunction<S> 返回 void 更新器类型：可以接收新状态或草稿函数
export type Updater<S> = (arg: S | DraftFunction<S>) => void;

// 返回一个元组类型 ImmerHook<S> 包含两个元素 Hook 返回类型：[状态, 更新函数]
export type ImmerHook<S> = [S, Updater<S>];

// 修正：统一使用 S 类型参数，并且实现要匹配声明
export function useImmer<S = unknown>(initialValue: S | (() => S)): ImmerHook<S> {
   // 1. 初始化时冻结状态，确保不可变
  const [val, updateValue] = useState(() =>
    freeze(typeof initialValue === 'function' ? (initialValue as () => S)() : initialValue, true),
  );
   // 2. 创建智能更新器
  const updater = useCallback((updater: S | DraftFunction<S>) => {
    if (typeof updater === 'function') {
      updateValue(produce(updater as DraftFunction<S>));
    } else {
      updateValue(freeze(updater));
    }
  }, []);

  return [val, updater];
}
