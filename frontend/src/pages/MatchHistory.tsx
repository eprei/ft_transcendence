import { useLoaderData } from "react-router-dom"
import { MatchData } from "../types/MatchData"
import { useAppDispatch, useAppSelector } from "../store/types"
import { matchActions } from "../store/match"

const MatchHistory = () => {
    const fetchMatchHistory = useLoaderData() as MatchData
    const dispatch = useAppDispatch()
    dispatch(matchActions.update({ matchHistory: fetchMatchHistory }))

    // const matchHistory = this.

    // const matchHistoryList = matchHistory.map(match => 
    //     <li key={match.id}>
    //         {match.winner} beat {match.loser}
    //     </li>
    // );

    const MatchData = useAppSelector((state) => state.match.matchData) as MatchData

    return (
        <>
            <h1>Match History</h1>
            
            <div>
                <ul>
                    <li>match</li>
                </ul>
            </div>
        </>
    )
}

export default MatchHistory
