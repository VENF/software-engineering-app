/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { rechargeService } from "src/domain/creditCart.services"
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    Grid,
    Typography,
    Box,
} from '@mui/material';
import ButtonDefault from "@mui/material/Button"
import { styled } from '@mui/material/styles';
import { Field } from 'src/infrastructure/shared/components/Field/Field';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Button } from 'src/infrastructure/shared/components/Button/Button';

const StyledDialog = styled(DialogContent)(({ theme }) => ({
    background: theme.palette.background.paper,
    width: "400px"
}));

export const SuccessMessage = ({ open }) => {

    const navigate = useNavigate();
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                navigate(0)
            }, 1000);
        }
    }, [open])

    return (
        <Dialog open={open}>
            <StyledDialog>
                <Box style={{
                    display: "grid",
                    placeItems: "center"
                }}>
                    <Typography variant="h4">Recarga exitosa</Typography>
                </Box>
            </StyledDialog>
        </Dialog>
    );
};


export const DialogRecharge = ({ open, handlerClouse, success }) => {
    const [recharge, setRecharge] = useState(false)
    const [message, setMessage] = useState("")
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        setRecharge(true)
        setTimeout(() => {
            rechargeService({ amount: data.amount })
                .then(res => {
                    setRecharge(false)
                    if (res.msg === 'Debes ingresar un monto mayor a 0') {
                        setMessage(res.msg)
                    } else {
                        success({
                            open: false,
                            success: true
                        })
                    }
                })
        }, 1000);
    };

    return (
        <Dialog open={open} onClose={handlerClouse}>
            <StyledDialog>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box style={{
                                display: "grid",
                                placeItems: "center"
                            }}>
                                <Typography variant="h4">Behold</Typography>
                                <Typography variant="h6">Recarga tu tarjeta</Typography>
                            </Box>
                            {message && (
                                <Box style={{
                                    padding: '10px',
                                    display: "grid",
                                    placeItems: "center"
                                }}>
                                    <Typography color="error" variant="body2">
                                        {message}
                                    </Typography>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {errors?.cardnumber && (
                                <Box style={{ padding: '10px' }}>
                                    <Typography color="error" variant="body2">
                                        {errors?.cardnumber?.message}
                                    </Typography>
                                </Box>
                            )}
                            <Controller
                                name="cardnumber"
                                control={control}
                                rules={{
                                    required: 'Debes ingresar tu numero de tarjeta!',
                                }}
                                render={({ field }) => (
                                    <Field
                                        {...field}
                                        width="100%"
                                        type="number"
                                        placeholder="Numero de tarjeta"
                                        autoComplete="off"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {errors?.name && (
                                <Box style={{ padding: '10px' }}>
                                    <Typography color="error" variant="body2">
                                        {errors?.name?.message}
                                    </Typography>
                                </Box>
                            )}
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: 'Debes ingresar tu nombre!',
                                }}
                                render={({ field }) => (
                                    <Field
                                        {...field}
                                        width="100%"
                                        type="text"
                                        placeholder="Nombre"
                                        autoComplete="off"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {errors?.cvv && (
                                <Box style={{ padding: '10px' }}>
                                    <Typography color="error" variant="body2">
                                        {errors?.cvv?.message}
                                    </Typography>
                                </Box>
                            )}
                            <Controller
                                name="cvv"
                                control={control}
                                rules={{
                                    required: 'necesitas el codigo cvv!',
                                }}
                                render={({ field }) => (
                                    <Field
                                        {...field}
                                        width="100%"
                                        type="text"
                                        placeholder="cvv"
                                        autoComplete="off"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {errors?.amount && (
                                <Box style={{ padding: '10px' }}>
                                    <Typography color="error" variant="body2">
                                        {errors?.amount?.message}
                                    </Typography>
                                </Box>
                            )}
                            <Controller
                                name="amount"
                                control={control}
                                rules={{
                                    required: 'Debes ingresar el monto a recargar!',
                                }}
                                render={({ field }) => (
                                    <Field
                                        {...field}
                                        width="100%"
                                        type="number"
                                        placeholder="Monto"
                                        autoComplete="off"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button isLoading={recharge} type="submit" width='100%'>Recargar</Button>
                        </Grid>
                    </Grid>
                </form>
            </StyledDialog>
        </Dialog>
    );
};


export const RechargeCredit = () => {
    const [recharge, setRecharge] = useState({
        open: false,
        success: false
    })

    const handlerClouse = () => setRecharge(pre => ({ ...pre, open: false }))

    return (
        <Box style={{ marginTop: "2rem" }}>
            <ButtonDefault
                onClick={() => setRecharge(pre => ({ ...pre, open: true }))}
                variant='outlined'
            >
                Recargar
            </ButtonDefault>
            <DialogRecharge success={setRecharge} open={recharge.open} handlerClouse={handlerClouse} />
            <SuccessMessage open={recharge.success} />
        </Box>
    );
};
