import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CoinGecko from 'coingecko-api';
const coinGeckoClient = new CoinGecko();


export default function Home(props) {
  const { data } = props.result;
  console.log(data);
  // const formatPercentage = number => '${new Number(number).toFixed(2)}%'
  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat(
      'en-US',
      {
        style: 'currency',
        currency: 'usd',
        maximumSignificantDigits
      })
      .format(number);
  return (
    <div className={styles.container}>
      <Head>
        <title>Coinmarketcap clone</title>
        <link rel="icon" href="/favicon.ico" />
  
      </Head>

      <h1>Coinmarketcap clone</h1>
      <table className='table'>
       <thead>
        <tr>
         <th>Symbol</th>
         <th>24H</th>
         <th>Price</th>
         <th>Market cap</th>
        </tr>
       </thead>
       <tbody>
       </tbody>
       	{data.map(coin =>(
       		<tr key={coin.id}>
       		 <td>
              <img
              src={coin.image}
              style={{width:45, height: 45, marginRight:10}}
              />
              {coin.symbol.toUpperCase()}
            </td>
       		  <td>
               <span
                className={coin.price_change_percentage_24h > 0 ?(
                  'text-success'
                ): 'text-danger'}
               >
             {coin.price_change_percentage_24h.toFixed(2) + '%'}
             </span>
            </td>
       		 <td>{formatDollar(coin.current_price, 20)}</td>
       		 <td>{formatDollar(coin.market_cap,12)}</td>
       		</tr>
       		))}
      </table>
    </div>
  )
}


export async function getServerSideProps(context){
const params = {
	order: CoinGecko.ORDER.MARKET_CAP_DESC
} 
const result = await coinGeckoClient.coins.markets({params});
	//render data in HTML table
	return {
		props: {
			result
		}
	};
}
