function Actions() {
    const actions = [
        {title: 'SIEMENS TE651319RW', sale: '-50%', priceOld: '33999грн', priceNew: '16999грн', imgUrl: 'https://content1.rozetka.com.ua/goods/images/big/330510107.jpg'},
        {title: 'PHILIPS EP0820/00', sale: '-25%', priceOld: '10000', priceNew: '7500', imgUrl: 'https://content1.rozetka.com.ua/goods/images/big/297049203.jpg'}
    ]
    
  return (
    <div className="small__actions">
        {actions.map((action, index) => {
          return <ActionsCard action={action} key={index} />
        })}
    </div>
  );
}

function ActionsCard({action}) {
    return (
      <div className="small__action action">
        <h2 className="action__title">{action.title}</h2>
        <p className="action__sale">{action.sale}</p>
        <p className="action__text">Встигни купити дешевше!</p>
        <div className="action__img">
          <img src={action.imgUrl} alt="card"/>
          <div className="action__prices prices-action">
            <div className="prices-action__old">{action.priceOld}</div>
            <div className="prices-action__new">{action.priceNew}</div>
          </div>
        </div>
        <a href="#" className="action__btn btn__buy">Купити</a>
      </div>
    )
}

export default Actions;
