import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";


const initialState ={
    posts:[],
    popularPosts:[],
    loading: false,

}

export const createPost = createAsyncThunk('post/createPost', async(params) => {
    try {
        const {data} = await axios.post('/posts', params)
        return data
    } catch (error) {
        console.log(error)
    }
})
export const getAllPosts = createAsyncThunk('post/getAllPosts', async() => {
    try {
        const {data} = await axios.get('/posts')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const removePosts = createAsyncThunk('post/removePosts', async(id) => {
    try {
        const {data} = await axios.delete(`posts/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updatePost = createAsyncThunk('post/updatePost', async(updatedPost) => {
    try {
        const {data} = await axios.put(`posts/${updatedPost.id}`, updatedPost)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers:{
        //create post
        [createPost.pending]: (state) => {
            state.loading = true
        },
        [createPost.fulfilled]: (state,action) => {
            state.loading = false
            state.posts.push(action.payload)
        }, 
        [createPost.rejected]: (state,action) => {
            state.loading = false
        },
         //получение всех postов
         [getAllPosts.pending]: (state) => {
            state.loading = true
        },
        [getAllPosts.fulfilled]: (state,action) => {
            state.loading = false
            state.posts = action.payload.posts
            state.popularPosts = action.payload.popularPosts

        }, 
        [getAllPosts.rejected]: (state,action) => {
            state.loading = false
        },
          //Удаление поста 
          [removePosts.pending]: (state) => {
            state.loading = true
        },
        [removePosts.fulfilled]: (state,action) => {
            state.loading = false
            state.posts = state.posts.filter((post) => post._id !== action.payload.id)
        }, 
        [removePosts.rejected]: (state,action) => {
            state.loading = false
        },
          //редактировае  поста 
          [updatePost.pending]: (state) => {
            state.loading = true
        },
        [updatePost.fulfilled]: (state,action) => {
            state.loading = false
            //из бека возвращаем обновленный пост поэтому в слайсе будет лежать тот пост который обновлен и тем самым меняем стейт
            //ищем пост из массива постов у которого ид = ид который мы изменили 
            const index = state.posts.findIndex((post) => post._id === action.payload.id)
            state.posts[index] = action.payload
        }, 
        [updatePost.rejected]: (state,action) => {
            state.loading = false
        },
    }
})

export default postSlice.reducer