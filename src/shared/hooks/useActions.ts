import { useMemo } from 'react'

import {
  ActionCreator,
  ActionCreatorsMapObject,
  AsyncThunk,
  bindActionCreators,
} from '@reduxjs/toolkit'

import { useAppDispatch } from '@/src/shared/hooks'

/**
 * Данная функция useActions является React-хуком, который принимает объект actions с функциями-создателями действий (action creators)
 * и возвращает объект с привязанными действиями (bound actions), которые можно вызывать в компоненте.
 * Внутри хука useActions используется хук useMemo для мемоизации объекта с привязанными действиями и функции bindActionCreators
 * из пакета Redux для связывания действий с диспетчером Redux.
 * Тип BoundActions определяет тип объекта с привязанными действиями. Ключи объекта соответствуют ключам переданного объекта actions,
 * а значения - типам функций, которые создают действия. Если функция создает асинхронное действие с помощью createAsyncThunk из Redux Toolkit,
 * то тип привязанной функции заменяется на BoundAsyncThunk, который представляет функцию, принимающую аргументы и
 * возвращающую Promise с результатом выполнения действия.
 * Тип BoundAsyncThunk определяет тип асинхронной функции, привязанной к диспетчеру Redux. Он принимает аргументы,
 * переданные в функцию создания действия, и возвращает Promise с результатом выполнения действия.
 * Таким образом, использование хука useActions позволяет упростить вызов действий в компоненте и предотвратить
 * создание новых экземпляров функций-создателей действий при каждом рендеринге компонента.
 */
export const useActions = <Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(actions, dispatch), [])
}

// Types
type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key]
}

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
  ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>
