import {Heading, Experience, Skills, Certification, Projects, Education} from './DisplayResumeComponents';
import {useParams} from "react-router-dom"
import {useGetResumeByIdQuery} from "../redux/resume/resumeSlice";

const DisplayResume = () => {
    const {id} = useParams();
    console.log("display resume id", id)
    const {data: data, error, isLoading} = useGetResumeByIdQuery(id);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading resume</p>;
    if (!data) return <p>Resume not found</p>;
console.log("data", data)
    return (
        <div>
            <h1>Resume</h1>
            <Heading content={data.heading}/>
            <Experience content={data.experience}/>
            <Skills content={data.skills}/>
            <Certification content={data.certifications}/>
            <Projects content={data.projects}/>
            <Education content={data.education}/>
        </div>
    )
}

export default DisplayResume;