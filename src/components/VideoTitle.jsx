const VideoTitle = ({title,overview}) => {
 
    return(
        <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
            <h1 className="text-5xl font-bold">{title}</h1>
            <p  className="py-6 pl-1 text-sm w-1/4">{overview}</p>   
            <div className="flex gap-2">
                <button className="bg-white text-black p-4 px-14 text-xl rounded-lg hover:bg-white/80">▶Play</button>
                <button className=" bg-gray-500/50 text-white p-4 px-12 text-xl rounded-lg hover:bg-gray-500/70 ">More Info</button>
            </div> 
        </div>
       
    )
}

export default VideoTitle;