import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, EyeIcon, EyeOffIcon } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const fieldVariants = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  error: { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.4 } },
};

const errorVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const iconVariants = {
  initial: { rotate: 0, scale: 1 },
  animate: { rotate: 360, scale: 1.1 },
};

interface LoginFormProps {
  onSubmit?: (values: z.infer<typeof loginSchema>) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onSignupClick?: () => void;
}

const LoginForm = ({
  onSubmit = async () => {},
  isLoading = false,
  error = null,
  onSignupClick,
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await onSubmit(values);
    } catch (err) {
      console.error("Erro ao enviar o formulário:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-6 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-xl mx-auto"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              const hasError = !!form.formState.errors.email;
              return (
                <motion.div
                  variants={fieldVariants}
                  animate={hasError ? "error" : "visible"}
                >
                  <FormItem className="space-y-2">
                    <label className="text-sm font-semibold text-white block">E-mail</label>
                    <FormControl>
                      <input
                        type="email"
                        placeholder="seunome@email.com"
                        className={`w-full h-12 px-4 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-sm ${hasError ? "ring-2 ring-red-400" : ""}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-200" />
                  </FormItem>
                </motion.div>
              );
            }}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              const hasError = !!form.formState.errors.password;
              return (
                <motion.div
                  variants={fieldVariants}
                  animate={hasError ? "error" : "visible"}
                >
                  <FormItem className="space-y-2">
                    <label className="text-sm font-semibold text-white block">Senha</label>
                    <FormControl>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className={`w-full h-12 px-4 pr-10 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-sm ${hasError ? "ring-2 ring-red-400" : ""}`}
                          {...field}
                        />
                        <motion.button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                          tabIndex={-1}
                          initial="initial"
                          animate="animate"
                          variants={iconVariants}
                          transition={{ duration: 0.5 }}
                          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                          {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </motion.button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-200" />
                  </FormItem>
                </motion.div>
              );
            }}
          />

          {error && (
            <motion.div
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              className="p-3 text-sm text-red-100 bg-red-500/20 rounded-md"
            >
              {error}
            </motion.div>
          )}

          <motion.div whileHover={{ scale: 1.03 }}>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-full bg-purple-800 hover:bg-purple-900 text-white font-semibold transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </motion.div>

          <motion.div
            className="text-sm text-center text-white mt-4"
            initial="visible"
            animate="visible"
            variants={fieldVariants}
          >
            Ainda não tem uma conta?{' '}
            <button
              type="button"
              onClick={onSignupClick}
              className="underline font-semibold hover:text-purple-200"
            >
              Cadastre-se
            </button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};

export default LoginForm;
