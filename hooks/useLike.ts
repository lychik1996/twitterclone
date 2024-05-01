
import usePost from "./usePost";
import usePosts from "./usePosts";
import useCurrentUser from "./userCurrentUser"
import useLoginModal from './useLoginModal';
import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const useLike = ({postId, userId}:{postId:string,userId?:string})=>{
    const {data:currentUser} = useCurrentUser();
    const {data:fetchedPost, mutate:mutateFetchedPost} = usePost(postId);

    const {mutate:mutateFetchedPosts} = usePosts(userId);

    const LoginModal = useLoginModal();
    const hasLiked = useMemo(()=>{
        const list = fetchedPost?.likedIds || [];
        return list.includes(currentUser?.id)
    },[currentUser?.id,fetchedPost?.likedIds]);
 
 
    const toggleLike = useCallback(async()=>{
        if(!currentUser){
            return LoginModal.onOpen()
        };
        try{
            let request;
            if(hasLiked){
                request=()=>axios.delete('/api/like',{data:{postId,currentUser}});
            }else{
                request=()=>axios.post('/api/like',{postId, currentUser})
            }
            await request();
            mutateFetchedPost();
            mutateFetchedPosts();

            toast.success('Success')
        }catch(error){
            toast.error("something went wrong");
        }
    },[currentUser, hasLiked, postId, mutateFetchedPost, mutateFetchedPosts, LoginModal])
        return{
            hasLiked,
            toggleLike
        }
}
export default useLike;