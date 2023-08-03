function NotFound({title}) {
    return ( 
        <div className="not-fond">
            <p className="not-fond__title">{title ? title : 'На жаль такої сторінки не знайдено'}</p>
        </div>
     );
}

export default NotFound;