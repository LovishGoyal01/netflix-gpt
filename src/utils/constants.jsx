

export const logo = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-01/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"

export const photoUrl =   "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"

export const poster = "https://assets.nflxext.com/ffe/siteui/vlv3/05e91faa-6f6d-4325-934e-5418dcc2567b/web/IN-en-20250630-TRIFECTA-perspective_159086b1-425f-435b-bcd5-1ed8039cdef9_small.jpg"


export const API_options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_APP_TMDB_KEY}`
  }
};


export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const SUPPOERTED_LANGUAGES = [{identifier:"en" , name:"English"},{identifier:"hindi" , name:"Hindi"},{identifier:"spanish" , name:"Spanish"},]

export const OPENAI_KEY= `${import.meta.env.VITE_APP_GPT_KEY}`