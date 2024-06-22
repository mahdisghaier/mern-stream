import { Helmet } from 'react-helmet-async';
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '../components/iconify';
import { About } from '../sections/@dashboard/aboutUs/index'; // Assuming a TeamMemberCard component
import TEAM_MEMBERS from '../_mock/teamMembers'; // Mock data for team members

// ----------------------------------------------------------------------

export default function AboutUsPage() {
  return (
    <>
      <Helmet>
        <title>About Us </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>
          {/* Replace with any action button as needed */}
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Action Button
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {TEAM_MEMBERS.map((member, index) => (
            <About key={member.id} member={member} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
