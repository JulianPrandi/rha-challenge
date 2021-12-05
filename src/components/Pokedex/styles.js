import{ makeStyles} from "@material-ui/core/styles"

export const useStyles = makeStyles({
    pokedexContainer:{
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px'
    },
    cardMedia:{
        margin: "auto"
    },
    cardContent:{
        textAlign: "center"
    },
    searchContainer:{
        display: 'flex',
        marginBottom:'5px'
    },
    searchIcon:{
        alignSelf: "flex-end",
        marginTop:"16px",
        marginBottom: "5px"
    },
    tul:{
        alignItems: 'center',
    }
})