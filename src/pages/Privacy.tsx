import React from 'react';
import { Layout } from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function Privacy() {
  const navigate = useNavigate();

  return (
    <Layout title="Política de Privacidade">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto h-[calc(100vh-8rem)]">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </button>
        </div>
        <article className="prose dark:prose-invert max-w-none text-gray-900 dark:text-gray-100">
          <h1 className="text-gray-900 dark:text-white"><strong>Política de Privacidade do ExpertChat</strong></h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Última atualização: 08 de Dezembro de 2024</p>

          <br />
          <p className="text-gray-700 dark:text-gray-300">O ExpertChat valoriza a privacidade de seus usuários e se compromete a proteger todas as informações fornecidas. Esta política de privacidade explica como coletamos, usamos, armazenamos e compartilhamos dados ao usar nosso sistema.</p>

          <br />
          <h2 className="text-gray-900 dark:text-white"><strong>1. Coleta de Informações</strong></h2>
          <br />
          <p className="text-gray-700 dark:text-gray-300">Para oferecer a criação de bots especialistas em assuntos específicos, podemos coletar as seguintes informações:</p>
          <ul className="text-gray-700 dark:text-gray-300">
            <li>Informações fornecidas pelo usuário: Dados inseridos ao configurar um bot, como temas, textos ou personalizações.</li>
            <li>Dados de uso: Informações sobre como o sistema é utilizado (logs de interação com os bots, número de acessos, entre outros).</li>
            <li>Dados técnicos: Endereço IP, navegador, dispositivo e outras informações técnicas necessárias para garantir o funcionamento e a segurança do sistema.</li>
          </ul>

          <br />
          <h2 className="text-gray-900 dark:text-white"><strong>2. Uso das Informações</strong></h2>
          <br />
          <p className="text-gray-700 dark:text-gray-300">As informações coletadas são utilizadas para:</p>
          <ul className="text-gray-700 dark:text-gray-300">
            <li>Personalização e treinamento dos bots: Garantir que o bot criado atenda ao propósito informado pelo usuário.</li>
            <li>Melhoria do sistema: Analisar interações para melhorar funcionalidades e desempenho.</li>
            <li>Suporte ao usuário: Resolver dúvidas e problemas reportados.</li>
          </ul>

          <br />
          <h2 className="text-gray-900 dark:text-white"><strong>3. Compartilhamento de Dados</strong></h2>
          <br />
          <p className="text-gray-700 dark:text-gray-300">O ExpertChat não compartilha informações com terceiros, exceto nos casos:</p>
          <ul className="text-gray-700 dark:text-gray-300">
            <li>Obrigação legal: Quando exigido por lei ou autoridades competentes.</li>
            <li>Parceiros de serviço: Apenas quando necessário para hospedar ou operar o sistema (seguindo rigorosos padrões de privacidade).</li>
          </ul>

          <br />
          <h2 className="text-gray-900 dark:text-white"><strong>4. Segurança dos Dados</strong></h2>
          <br />
          <p className="text-gray-700 dark:text-gray-300">Adotamos medidas técnicas e organizacionais para proteger as informações contra acessos não autorizados, alterações, divulgação ou destruição. Isso inclui:</p>
          <ul className="text-gray-700 dark:text-gray-300">
            <li>Criptografia de dados.</li>
            <li>Acesso restrito aos servidores.</li>
            <li>Monitoramento constante de ameaças.</li>
          </ul>

          <br />
          <h2 className="text-gray-900 dark:text-white"><strong>5. Direitos do Usuário</strong></h2>
          <br />
          <p className="text-gray-700 dark:text-gray-300">Você tem os seguintes direitos em relação aos seus dados:</p>
          <ul className="text-gray-700 dark:text-gray-300">
            <li>Acessar, corrigir ou excluir informações pessoais armazenadas.</li>
            <li>Solicitar a interrupção do uso dos seus dados para fins específicos.</li>
            <li>Retirar o consentimento de uso a qualquer momento, respeitando os limites legais.</li>
          </ul>

          <br />
          <h2 className="text-gray-900 dark:text-white"><strong>6. Cookies</strong></h2>
          <br />
          <p className="text-gray-700 dark:text-gray-300">Utilizamos cookies para:</p>
          <ul className="text-gray-700 dark:text-gray-300">
            <li>Garantir a funcionalidade do sistema.</li>
            <li>Personalizar a experiência do usuário.</li>
            <li>Analisar o desempenho do sistema e corrigir falhas.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">Você pode desativar os cookies nas configurações do navegador, mas isso pode limitar algumas funcionalidades do sistema.</p>

          <br />
          <h2 className="text-gray-900 dark:text-white"><strong>7. Alterações nesta Política de Privacidade</strong></h2>
          <br />
          <p className="text-gray-700 dark:text-gray-300">Podemos atualizar esta política periodicamente. Notificaremos os usuários sobre mudanças significativas através do sistema ou outros meios de contato informados.</p>

          <br />
          <h2 className="text-gray-900 dark:text-white"><strong>8. Contato</strong></h2>
          <br />
          <p className="text-gray-700 dark:text-gray-300">Se você tiver dúvidas ou preocupações sobre esta política de privacidade, entre em contato conosco pelo e-mail tallescosttapaiva@gmail.com ou pelo canal de atendimento (85) 98937-1201.</p>
        </article>
      </div>
    </Layout>
  );
}