'use client';

import { Dict, Form, FormControl, FormField, FormItem, Label, FormMessage, Input, cn } from '@shtcut-ui/react';
import { NavLink } from '@shtcut/components';
import { AppAlert, AppButton, PasswordInput } from '@shtcut/components/_shared';
import { get } from 'lodash';
import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInValidationSchema } from './validation';
import { SocialLogin } from '../social-login';

interface SignInFormProps extends HTMLAttributes<HTMLDivElement> {
    isLoading: boolean;
    handleLoginSubmit: (payload: Dict) => void;
    onFailure: (type: string, response: Dict) => void;
    onSuccess: (type: string, response: Dict) => void;
    error?: Dict;
}

export const SignInForm = (props: SignInFormProps) => {
    const { isLoading, handleLoginSubmit, error, className, onFailure, onSuccess } = props;

    const handleFormSubmit = (values: z.infer<typeof signInValidationSchema>) => {
        handleLoginSubmit(values);
    };

    const form = useForm<z.infer<typeof signInValidationSchema>>({
        resolver: zodResolver(signInValidationSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <Label>Email</Label>
                                    <FormControl>
                                        <Input placeholder="name@example.com" className="h-12" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center justify-start">
                                        <Label>Password</Label>
                                    </div>
                                    <FormControl>
                                        <PasswordInput className="h-12" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="text-sm mt-2 font-medium text-muted-foreground">
                            Forgot password?
                            <NavLink
                                href="/auth/forgot-password"
                                className="px-1  hover:opacity-75 text-blue-600 hover:text-blue-500"
                            >
                                Click here
                            </NavLink>
                        </div>
                        <AppButton
                            className="mt-2 h-12 px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150"
                            loading={isLoading}
                        >
                            Sign in
                        </AppButton>

                        <div className="relative my-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
            <SocialLogin onFailure={onFailure} onSuccess={onSuccess} isLoading={isLoading} />
            <div className="text-center">
                <Label className="text-muted-foreground">
                    Don`t have account?
                    <NavLink href="/auth/sign-up" className="px-1 text-blue-600 hover:opacity-75 hover:text-blue-500">
                        Sign up
                    </NavLink>
                </Label>
            </div>
        </div>
    );
};
