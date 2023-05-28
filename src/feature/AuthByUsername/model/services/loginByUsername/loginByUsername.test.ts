import { userActions } from 'entities/User'
import { loginByUsername } from './loginByUsername'
import { TestAsynkThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

// jest.mock('axios') // Убрать нельзя, тк ниже мы уже обрабатываем мокнутую библиотеку(как я понял)

// const mockedAxios = jest.mocked(axios, true) // Модуль, который мы мокаем, мокаем ли мы внутренние поля

describe('loginByUsername.test', () => {
  // let dispatch: Dispatch
  // let getState: () => StateSchema

  // beforeEach(() => {
  //   dispatch = jest.fn()
  //   getState = jest.fn()
  //   // Присвоили какие-то функции, которые подстроились под тип ts
  // })

  // test('success login', async () => {
  //   const userValue = { username: 'Sasha', id: '12' }
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue })) // Мокнули возвращаемое значение
  //   const action = loginByUsername({ username: '123', password: '134' }) // createAsyncThunk - action creator и возвращает action после вызова
  //   // И как я понял loginByUsername - коллбек, который принимает payload
  //   // И возвращает он action, который обычно обрабатывается с помощью dispatch
  //   const result = await action(dispatch, getState, undefined) // 3 это extra аргумент

  //   expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue)) // Проверили, что внутри action был вызван dispatch с такими-то аргументами
  //   expect(dispatch).toHaveBeenCalledTimes(3) // c loginByUsername, внутри dispatch результата axios, fulfilled / rejected dispatch (Экстра редьюсер)
  //   expect(mockedAxios.post).toHaveBeenCalled() // Был вызван (замоканный axios)
  //   // Я так понял, что оно автоматически благодаря верхним мокам axios подменяет одно на другое, когда видит в коде
  //   expect(result.meta.requestStatus).toBe('fulfilled') // Проверили, что в результат положилось то, что надо (результат мока axios'а)
  //   expect(result.payload).toEqual(userValue)
  // })

  // test('error login', async () => {
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
  //   const action = loginByUsername({ username: '123', password: '134' })
  //   const result = await action(dispatch, getState, undefined)

  //   expect(dispatch).toHaveBeenCalledTimes(2)
  //   expect(mockedAxios.post).toHaveBeenCalled()
  //   expect(result.meta.requestStatus).toBe('rejected')
  //   expect(result.payload).toBe('error')
  // })

  test('success login', async () => {
    const userValue = { username: 'Sasha', id: '12' }

    const thunk = new TestAsynkThunk(loginByUsername)
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }))
    const result = await thunk.callThunk({ username: '123', password: '134' })

    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
    expect(thunk.dispatch).toHaveBeenCalledTimes(3)
    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(userValue)
  })

  test('error login', async () => {
    const thunk = new TestAsynkThunk(loginByUsername)
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await thunk.callThunk({ username: '123', password: '134' })

    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
