import { db } from "@/app/lib/db";

export default async function DbTestPage() {

    try {

         // test query

        const [rows] = await db.query('SELECT 1 + 1 AS result');
        const result = (rows as any)[0]?.result;

    return (
        <div style={{display: 'flex', flexDirection: 'column',
         justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <div style={{border: '1px solid #000', padding: '1.5rem', textAlign: 'center', boxShadow: '0 4px 12px rgba( 0,0,0,0.3', backgroundColor: '#fff'}}>
                <h1>Database Connected 💪</h1>
                <p>Test query returned: {result} ✔️</p>
                <h3>You are a real champion! </h3>
                <h1>🍾🍾🍾🍾🍾🍾🍾🍾🍾🍾🍾🍾</h1>
            </div>
           
        </div>
        
    )
    } catch (error) {

        console.error('❌ DB connection failed:', error)
        return  (
            <div>
                 <h1>Database connection failed 🥺</h1>
                 <p>Test query returned: {String(error)}</p>
            </div>
        )

    }

   

   
}