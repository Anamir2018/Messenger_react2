import REACTION_ICONS from '../../assets/reactionIcons'


function Reaction(props: {value: number}) {
    
    return (
        <div>
            {props.value >= 0 && 
                <img className="w-5 mx-3.3"  
                    src={REACTION_ICONS[props.value]} 
                    alt="reaction" 
                    
                    />}
        </div>
    )
}

export default Reaction

