const VideoTitle = ({title,overview}) => {
 
    return(
        <div className="w-screen aspect-video pt-[16%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
            <h1 className="text-[20px] md:text-5xl font-bold">{title}</h1>
            <p  className="hidden md:inline-block py-6 pl-1 text-sm w-1/4">{overview}</p>   
            <div className="flex gap-2">
                <button className="bg-white text-black py-1 md:py-4 px-3 md:px-14 text-xl rounded-lg hover:bg-white/80 my-4 md:my-0 ">▶Play</button>
                <button className="hidden md:inline-block bg-gray-500/50 text-white p-4 px-12 text-xl rounded-lg hover:bg-gray-500/70 ">More Info</button>
            </div> 
        </div>
       
    )
}

export default VideoTitle;