import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { EditableProfileCard } from '@/feature/editableProfileCard'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'
import { Page } from '@/widgets/Page'

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation('profile')

  if (!id) {
    return <Text text={t('Профиль не найден')} />
  }

  return (
        <Page className={classNames('', {}, [className])}>
            <VStack gap="16" max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
  )
}

export default ProfilePage
