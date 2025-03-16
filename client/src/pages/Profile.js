import {useEffect, React} from 'react';
import { useSelector } from 'react-redux';
import ResumeCard from '../components/ResumeCard'; // Component to display individual resume

const ProfilePage = () => {
    const user = useSelector(state => state.auth.username)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const email = useSelector(state => state.auth.email)
    // Fetching resumes using RTK Query hook
   // const { data: resumes, error: resumesError, isLoading: resumesLoading } = useGetResumesQuery();

    // if (user.isLoggedIn g) {
    //     return <div>Loading...</div>;
    // }
    // if (resumesError) {
    //     return <div>Error loading resumes.</div>;
    // }
    const state = useSelector(state => state.auth);
    useEffect(()=>{
        console.log(state)
    }, [state])
    return (
        <div className="profile-page">
            {/* User Details */}
            {user && (
                <div className="user-details">
                    <h1>{user}</h1>
                    <p>Email: {email}</p>
                    <p>Phone: {}</p>
                    <p>LinkedIn: <a href={user.linkedin} target="_blank" rel="noopener noreferrer">{user.linkedin}</a></p>
                    <p>GitHub: <a href={user.github} target="_blank" rel="noopener noreferrer">{user.github}</a></p>
                </div>
            )}

            {/* User Resumes */}
            <div className="user-resumes">
                <h2>My Resumes</h2>
                {/*{resumes && resumes.length === 0 ? (*/}
                {/*    <p>No resumes found.</p>*/}
                {/*) : (*/}
                {/*    resumes.map((resume) => (*/}
                {/*        <ResumeCard key={resume._id} resume={resume} />*/}
                {/*    ))*/}
                {/*)}*/}
            </div>
        </div>
    );
};

export default ProfilePage;
