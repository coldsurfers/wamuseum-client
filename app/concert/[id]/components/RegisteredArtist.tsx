import { Text } from '@coldsurfers/hotsurf'
import { Artist } from '../../../../src/__generated__/graphql'

const RegisteredArtist = ({ value }: { value: Artist }) => (
  <div key={value.id}>
    <Text style={{ fontWeight: '500', fontSize: 23 }}>{value.name}</Text>
  </div>
)

export default RegisteredArtist
