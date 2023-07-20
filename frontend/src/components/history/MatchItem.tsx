interface Match {
    winner: {
        nickname: string,
        avatarUrl: string
    },
    loser: {
        nickname: string,
        avatarUrl: string
    },
    scoreWinner: number,
    scoreLoser: number
}

const MatchItem = (props) => {
    const { winner, loser, scoreWinner, scoreLoser } = { props.match};

    return (
        <li>
            <div className="match-item">
                <div className="match-player">
                    <img src={winner.avatarUrl} alt="winner avatar"></img>
                    <span className="match-item__score">{scoreWinner}</span>
                    <span className="match-item__name">{winner.nickname}</span>
                </div>
                <div className="match-player">
                    <span className="match-item__score">{scoreLoser}</span>
                    <span className="match-item__name">{loser.nickname}</span>
                    <img src={loser.avatarUrl} alt="loser avatar"></img>
                </div>
            </div>
        </li>
    )
}

export { MatchItem };