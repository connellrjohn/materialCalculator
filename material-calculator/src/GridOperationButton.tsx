import { Button, Grid, styled } from "@mui/material"


interface GridOperationButtonProps {
    operation: string;
    selectOperation: (operation: string) => void;
    selectedOperation: string;
}

const StyledButton = styled(Button)<{selected: boolean}> ((props) => ({
    backgroundColor: "rgb(172, 120, 186)",
    borderColor: props.selected ? "#fff" : "rgba(230,230,250,0.5)",
    fontSize: "1em",
    fontStyle: "bold",
    fontFamily: "monospace"
}));

export const GridOperationButton: React.FC<GridOperationButtonProps> = ({
    operation,
    selectOperation,
    selectedOperation,
}) => {
    return (
        <Grid item xs={3}>
            <StyledButton fullWidth
            variant="outlined"
            onClick={() => selectOperation(operation)}
            selected={selectedOperation === operation}
            >
                {operation}
            </StyledButton>
        </Grid>
    )
};